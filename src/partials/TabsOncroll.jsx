import { useState } from 'react'
import { Tab } from '@headlessui/react'
import TabOption from './TabOption'
import tab1 from '../images/tab1.png'
import tab2 from '../images/blog.png'
import tab3 from '../images/blognav.png'

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

export default function Example() {

    let [categories] = useState({
        Recent: [

            {
                id: 1,
                number: 1,
                title: "Choose a tool",
                description: 'If you can write it, we can craft it.',
                img: tab1
            },
        ],
        Popular: [
            {
                id: 1,
                number: 2,
                title: "Tell us what to write",
                description: 'Input your details. Include your tone, audience, and language.',
                img: tab2
            },

        ],
        Trending: [
            {
                id: 1,
                number: 3,
                title: "Choose a tool",
                description: 'Edit, copy, and re-generate till you find content you love!',
                img: tab3
            }
        ],
    })

    return (
        <div className="w-full flex max-w-7xl flex-col     px-4 ">
            {/* Section header */}
            <div className=" mx-auto px-4 sm:px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h2 className="h2 text-gray-600  mb-4">
                        Content in seconds, not weeks
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <p className="text-2xl font-hkgrotesk text-gray-400">
                            Let your new AI assistant boost your creativity in 3 easy steps:
                        </p>
                    </div>
                </div>

                <Tab.Group >
                    <div className=' grid-cols-1 md:grid-cols-2 grid  max-w-7xl'>
                        <Tab.List className="flex  flex-col  items-center justify-center space-y-6 rounded-xl  p-4">
                            {Object.values(categories).map((category) => (
                                <Tab
                                    id={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full rounded-lg p-2  font-medium leading-5 text-purple-100',
                                            'ring-white  ',
                                            selected
                                                ? 'bg-purple-200 shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }
                                >
                                    {category.map((cat, id) => (
                                        <TabOption key={id} number={cat.number} title={cat.title} description={cat.description} />
                                    ))}

                                </Tab>

                            ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2   ">
                            {Object.values(categories).map((category, idx) => (
                                <Tab.Panel
                                    key={idx}
                                    className={classNames(
                                        'rounded-xl bg-white p-3 flex justify-end items-end',
                                        ''
                                    )}
                                >
                                    {category.map((cat, id) => (
                                        <img className='w-full md:h-96 object-contain' key={id} alt='nothing' src={cat.img} />
                                    ))}
                                </Tab.Panel>

                            ))}
                        </Tab.Panels></div>
                </Tab.Group>
            </div>
        </div>
    )
}
