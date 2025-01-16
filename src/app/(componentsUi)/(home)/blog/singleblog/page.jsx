'use client';

import React, { useState } from "react";

const App = () => {
    return (
        <div className="bg-white  flex flex-col  mt-20 px-4 sm:px-8 lg:px-72 text-gray-800 font-sans min-h-screen">
            <Header
                title="Rudrabhishek Puja 2025"
                date="15 January 2025"
                author="SmartPuja Desk"
            />
            <ImageSection
                imageUrl="http://localhost:3000/_next/image?url=%2Fimage%2Fsatnarayan.png&w=640&q=75"
                alt="Main Image of Rudrabhishek Puja"
            />
            <Description
                title="Satyanarayan Pooja Guide 2025"
                contents={`Satyanarayan Puja is an ancient and powerful ritual dedicated to Lord Shiva, specifically invoking the energy of his Rudra form. This puja involves chanting the Rudra mantra, a sacred Vedic prayer, believed to infuse positive vibes and energy into the surroundings. The ritual purifies the mind, body, and soul, bringing peace and prosperityThis puja involves chanting the Rudra mantra, a sacred Vedic prayer, believed to infuse positive vibes and energy into the surroundings. The ritual purifies the mind, body, and soul, bringing peace and prosperity.`}
            />
            <ImageSection
                imageUrl="https://img.freepik.com/free-photo/indian-bride-s-parents-hold-bowl-with-coconut-her-hands_8353-740.jpg?ga=GA1.1.1275289697.1728223870&semt=ais_hybrid"
                alt="Shivling Abhishek Ritual"
            />
            <Significance />
            <FAQ />
            <CallToAction />
        </div>
    );
};

const Header = ({ title, date, author }) => (
    <div className="mb-8">
        <h1 className="text-4xl font-bold text-orange-600">{title}</h1>
        <p className="text-gray-600 mt-2">
            {date} <span className="mx-2">|</span> <span className="font-medium">{author}</span>
        </p>
    </div>
);

const ImageSection = ({ imageUrl, alt }) => (
    <div className="relative flex mx-auto justify-center w-full sm:w-96 h-auto mb-6">
        <img
            src={imageUrl}
            alt={alt}
            className="w-full rounded-lg shadow-lg border border-gray-300"
        />
    </div>
);

const Description = ({ title, contents }) => (
    <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-orange-500">{title}</h2>
        <p className="text-gray-700 mt-4 leading-relaxed">{contents}</p>
    </div>
);

const Significance = () => (
    <div className="mb-8 text-center sm:text-left">
        <h2 className="text-3xl font-semibold text-orange-500">Significance of Rudrabhishek Puja</h2>
        <p className="text-gray-700 mt-4 leading-relaxed">
            Rudrabhishek Puja is performed to seek the blessings of Lord Shiva. It eliminates negative energies,
            removes obstacles, and purifies the surroundings. The ritual is known to align one's energy with
            the cosmic energies, promoting peace, health, and prosperity. The ritual is known to align one's energy with
            the cosmic energies, promoting peace, health, and prosperity. The ritual is known to align one's energy with
            the cosmic energies, promoting peace, health, and prosperity.
        </p>
    </div>
);

const FAQ = () => {
    const [openQuestion, setOpenQuestion] = useState(null);

    const toggleQuestion = (index) => {
        setOpenQuestion(openQuestion === index ? null : index);
    };

    const questions = [
        {
            question: "What is Rudrabhishek Puja?",
            answer:
                "Rudrabhishek Puja is a sacred ritual dedicated to Lord Shiva. It involves chanting the Rudra mantra and offering sacred items like milk, water, honey, and ghee on the Shivling to invoke divine d items like milk, water, honey, and ghee on the Shivling to invoke divine blessings.",
        },
        {
            question: "Who should perform Rudrabhishek Puja?",
            answer:
                "Anyone seeking peace, prosperity, and spiritual growth can perform Rudrabhishek Puja. It is especially recommended for those facing health issues, financial stral growth can perform Rudrabhishek Puja. It is especially recommended for those facing health issues, financial stral growth can perform Rudrabhishek Puja. It is especially recommended for those facing health issues, financial struggles, or negative influences.",
        },
        {
            question: "What are the benefits of Rudrabhishek Puja?",
            answer:
                "The puja purifies the mind, body, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.",
        },{
            question: "Who is Lord Satyanarayana?",
            answer:
                "The puja purifies the mind, body, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.",
        },{
            question: "What are the benefits of Rudrabhishek Puja?",
            answer:
                "The puja purifies the mind, body, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.dy, and soul, removes karmic imbalances, and brings peace, harmony, and prosperity to one's life.",
        },
    ];

    return (
        <div className="mb-8">
            <h2 className="text-3xl font-semibold text-orange-500 text-center sm:text-left">
                Frequently Asked Questions (FAQ)
            </h2>
            <div className="mt-4">
                {questions.map((item, index) => (
                    <div key={index} className="mb-4">
                        <button
                            onClick={() => toggleQuestion(index)}
                            className="text-lg font-semibold text-gray-800 w-full text-left flex justify-between items-center bg-gray-100 hover:bg-gray-200 p-4 rounded-lg"
                            aria-expanded={openQuestion === index}
                        >
                            {item.question}
                            <span className="ml-2">
                                {openQuestion === index ? "-" : "+"}
                            </span>
                        </button>
                        {openQuestion === index && (
                            <p className="text-gray-700 mt-2 ml-4">{item.answer}</p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

const CallToAction = () => (
    <div className="text-center my-8">
        <p className="text-lg text-gray-700 mb-4">
            Join us for this sacred ritual and experience the divine blessings of Lord Shiva.
        </p>
        <button className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-6 rounded-lg shadow-md">
            Book Your Puja Now
        </button>
    </div>
);

export default App;
