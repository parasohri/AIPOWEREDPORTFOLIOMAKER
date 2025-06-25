import { NextRequest, NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';
import mammoth from 'mammoth';
 


export async function POST(req: NextRequest): Promise<NextResponse> {
  const formData = await req.formData();
  const file = formData.get('file');

  // Validate file
  if (!file || typeof (file as any).arrayBuffer !== 'function') {
    return NextResponse.json({ error: 'No valid DOCX file uploaded.' }, { status: 400 });
  }

  const fileName = uuidv4() + '.docx';
  const filePath = path.join('/tmp', fileName);

  try {
    // Save to temp
    const arrayBuffer = await (file as Blob).arrayBuffer();
    console.log("ab",arrayBuffer);
    
    const buffer = Buffer.from(arrayBuffer);
    console.log("bf",buffer);
    
    await fs.writeFile(filePath, buffer);

    // Extract HTML with mammoth (preserves links)
    const result = await mammoth.convertToHtml({ path: filePath });
    const html = result.value;

    // Extract plain text
    const plainText = html.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();

    // Extract hyperlinks (hrefs)
    const linkRegex = /href="([^"]+)"/g;
    const links = [...html.matchAll(linkRegex)].map(match => match[1]);

    return NextResponse.json({
      text: plainText,
      links: links
    });
  } catch (error) {
    console.error('Error processing DOCX:', error);
    return NextResponse.json({ error: 'Failed to parse DOCX.' }, { status: 500 });
  }
}
