import Section from "../pujaservice/section";

export default function Page() {
    return (
        <>
        <Section
                bgImageUrl="/image/blg.jpeg"
                title="Okpuja Blog"
                description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
              />
        <div className="container mx-auto p-6">           
            <div className="bg-white p-6 rounded-lg border shadow-md">
                <h2 className="text-2xl font-semibold mb-4">Category List</h2>
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Category Name</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Slug</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Meta Title</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Meta Keyword</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Meta Description</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Publication Status</th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-900">Technology</td>
                            <td className="px-6 py-4 text-sm text-gray-900">technology</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Published</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Published</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Published</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Published</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <button
                                   
                                    className="text-blue-500 hover:text-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                        <tr className="border-b">
                            <td className="px-6 py-4 text-sm text-gray-900">Health</td>
                            <td className="px-6 py-4 text-sm text-gray-900">health</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Unpublished</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Unpublished</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Unpublished</td>
                            <td className="px-6 py-4 text-sm text-gray-900">Unpublished</td>
                            <td className="px-6 py-4 text-sm text-gray-900">
                                <button
                                   
                                    className="text-blue-500 hover:text-blue-600 mr-2"
                                >
                                    Edit
                                </button>
                                <button
                                    className="text-red-500 hover:text-red-600"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}
