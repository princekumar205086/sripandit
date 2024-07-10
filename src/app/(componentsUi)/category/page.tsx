"use client"
import React, {useState, useEffect} from 'react'
import Section from '../(home)/pujaservice/section'
import axios from 'axios'

export default function Category() {
    // const category = [
    //     {
    //         id: 1,
    //         name: 'Category 1',
    //     },
    //     {
    //         id: 2,
    //         name: 'Category 2',
    //     },
    //     {
    //         id: 3,
    //         name: 'Category 3',
    //     },
    //     {
    //         id: 4,
    //         name: 'Category 4',
    //     },
    // ]

interface Category {
    id: number
    name: string
}

const [category, setCategory] = useState<Category[]>([])

useEffect(() => {
    axios.get('http://localhost:3000/api/pujacategory')
    .then((res) => {
        console.log(res.data)
        setCategory(res.data)
    })
    .catch((error) => {
        console.error('Error fetching data:', error)
    })
}   , [])

  return (
    <>
    <Section
        bgImageUrl="/image/astrology.png"
        title="Astrology Services"
        description="See all the Astrology services that we offer"
      />
        <div className="card">
            <div className="card-header">
                <h2 className="text-2xl font-semibold">Category</h2>
            </div>
            <div className="card-body mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {
                        category.map((item) => (
                            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md">
                                <h2 className='text-2xl'>id: {item.id},  category: {item.name}</h2>
                            </div>
                        ))
                    }
                </div>
            </div>
        </div>
    </>
  )
}
