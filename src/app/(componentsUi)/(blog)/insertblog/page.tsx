import React, { useState } from 'react';
import Section from '../../(home)/pujaservice/section';

export default function page() {
    return (
        <>
            <Section
                bgImageUrl="/image/blg.jpeg"
                title="Okpuja Blog"
                description="Read our latest blog posts and stay updated with the latest trends. We cover a wide range of topics including astrology, puja services, and more."
            />
            <div className="p-5 border rounded-lg shadow-md mt-10 max-w-lg mx-auto bg-white mb-4">
                <h2 className="text-2xl font-bold text-center mb-5">Category Form</h2>

                <form>
                    <div className="mb-4">
                        <label htmlFor="category_name" className="block text-sm font-medium text-gray-700">Category Name</label>
                        <input
                            type="text"
                            id="category_name"
                            name="category_name"
                            placeholder="Enter Category Name"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="category_slug" className="block text-sm font-medium text-gray-700">Category Slug</label>
                        <input
                            type="text"
                            id="category_slug"
                            name="category_slug"
                            placeholder="Enter Category Slug"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="meta_title" className="block text-sm font-medium text-gray-700">Meta Title</label>
                        <input
                            type="text"
                            id="meta_title"
                            name="meta_title"
                            placeholder="Enter Meta Title"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="meta_keyword" className="block text-sm font-medium text-gray-700">Meta Keywords</label>
                        <input
                            type="text"
                            id="meta_keyword"
                            name="meta_keyword"
                            placeholder="Enter Meta Keywords"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="meta_description" className="block text-sm font-medium text-gray-700">Meta Description</label>
                        <textarea
                            id="meta_description"
                            name="meta_description"
                            placeholder="Enter Meta Description"
                            rows={4}
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="publication_status" className="block text-sm font-medium text-gray-700">Publication Status</label>
                        <select
                            id="publication_status"
                            name="publication_status"
                            className="mt-1 p-3 w-full border border-gray-300 rounded-lg"
                        >
                            <option value="TRUE">Published</option>
                            <option value="FALSE">Unpublished</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="bg-orange-500 text-white p-3 w-full rounded-lg hover:bg-orange-600"
                    >
                        Save Category
                    </button>
                </form>
            </div>
        </>
    );
}
