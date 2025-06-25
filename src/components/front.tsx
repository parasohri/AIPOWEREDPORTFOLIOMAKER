"use client"
import React, {useState} from 'react'
 
import { useRouter } from 'next/navigation'

function Front() {
   const [file, setFile] = useState<File | null>(null);

    
      const [isUploading, setIsUploading] = useState<boolean>(false);

    const router = useRouter()
    //max file size of 60 mb

    const MAX_FILE_SIZE = 70 * 1024 * 1024

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!file) return;

        if (file.size > MAX_FILE_SIZE) {
            //TODO: add notification
            alert("File size too large")
            return;
        }

        setIsUploading(true)
        const formData = new FormData();
        formData.append("file", file);
         

        try {
            // const response = await axios.post("/api/video-upload", formData)
            // check for 200 response
            router.push("/")
        } catch (error) {
            console.log(error)
            // notification for failure
        } finally{
            setIsUploading(false)
        }

    }


    return (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Upload Video</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="label">
                <span className="label-text">Title</span>
              </label>
               
            </div>
            <div>
              <label className="label">
                <span className="label-text">Description</span>
              </label>
               
            </div>
            <div>
              <label className="label">
                <span className="label-text">Video File</span>
              </label>
              <input
                type="file"
                
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFile(e.target.files?.[0] || null)}
                className="file-input file-input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isUploading}
            >
              {isUploading ? "Uploading..." : "Upload Resume"}
            </button>
          </form>
        </div>
      );
}

export default Front