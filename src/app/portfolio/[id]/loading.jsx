export default function Loading() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
            <div className="w-full max-w-4xl">
                {/* Header Skeleton */}  


                <h1>loading...</h1>
                <div className="mb-8 animate-pulse">
                    <div className="h-12 bg-gray-700 rounded-lg w-3/4 mb-4"></div>
                    <div className="h-4 bg-gray-700 rounded w-1/2"></div>
                </div>

                {/* Content Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-pulse">
                    {/* Main Content */}
                    <div className="md:col-span-2 space-y-4">
                        <div className="h-64 bg-gray-700 rounded-lg"></div>
                        <div className="h-4 bg-gray-700 rounded w-full"></div>
                        <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-4">
                        <div className="h-40 bg-gray-700 rounded-lg"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                        <div className="h-10 bg-gray-700 rounded"></div>
                    </div>
                </div>
            </div>
        </div>
    );
}