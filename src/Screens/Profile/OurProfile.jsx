import React, { useEffect, useState } from 'react'
import Button from '/src/components/Button/Button'
import { dateFormat, firstLetterCapital } from '/src/Library/Others/Others'
import { useNavigate } from 'react-router-dom'
import BigPopup, { showBigPopup } from '/src/components/BigPopup/BigPopup'
import SetupAccount from '/src/Auth/Others/SetupAccount'
import ChangeProfilePic from './ChangeProfilePic'
import { blobToDataURL } from '/src/Library/Others/Others';
import { hideBigPopup } from '/src/components/BigPopup/BigPopup';
import ChangePassword from '/src/Auth/Others/ChangePassword'

const OurProfile = (props) => {
    const navigate = useNavigate()
    const [profile, setProfile] = useState(null)
    useEffect(() => {
        debugger
        if (props.data?.profile_picture) {
            setProfile("data:image/png;base64,"+(props.data.profile_picture))
        }
    }, [props.data.profile_picture])
    const handleEditProfile = () => {
        showBigPopup({
            onClose: () => {
                console.log('Closed')
            },
            children:(
                <ChangeProfilePic profile_picture={profile}/>
                )
            })
    }
    const handleViewProfile = (img) => {
        let a = document.getElementById('profile-img')
        a = a.src
        console.log(a)
        window.open(Object(a), '_blank')

    }
    const editProfile = () => {
       showBigPopup({
            onClose: () => {
            hideBigPopup()
            },
            children:
            (
                <SetupAccount />
            )
    })

    }

    const changepassword = () => {
        console.log("sdad")
        showBigPopup({
            onClose: () => {
                console.log('Closed')
            },
            children:
            (
                <ChangePassword/>
            )
    })
    }

    return (
        <div className="bg-gray-100">
            <div className="container mx-auto my-5 p-5">
                <div className="md:flex no-wrap md:-mx-2 ">
                    <div className="w-full md:w-3/12 md:mx-2">
                        <div className="bg-white p-3 border-t-4 border-green-400">
                            <div className=" overflow-hidden relative group">
                            {
                                props.data?.profile_picture ? <img id='profile-img' className='h-40 w-40 mx-auto rounded-full' src={profile}  />
                                 : <img className="h-40 w-40 mx-auto rounded-full"
                                    src={"https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"}
                                    alt="" />
                            }
                                
                                {
                                    props?.data?.profile_picture ? <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                                    <div className="text-white text-center">
                                        <button
                                            className="px-4 py-2 bg-blue-500 rounded-full mx-2"
                                            onClick={handleEditProfile}
                                        >
                                            Edit Profile
                                        </button>
                                        <button
                                            className="px-4 py-2 bg-green-500 rounded-full mx-2"
                                            onClick={(e) => handleViewProfile(profile)}
                                        >
                                            View Profile
                                        </button>
                                    </div>
                                </div>:<div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black bg-opacity-50 transition-opacity">
                                    <div className="text-white text-center">
                                        <button
                                            className="px-4 py-2 bg-blue-500 rounded-full mx-2"
                                            onClick={handleEditProfile}
                                        >
                                            Add Profile Picture
                                        </button>
                                    </div>
                                </div>
                                }
                            </div>
                            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1 text-center">{props?.data.fullname}</h1>
                            <h3 className="text-gray-600 font-lg text-semibold leading-6">{ }</h3>
                            <p className="text-sm text-gray-500 hover:text-gray-600 leading-6">{props?.data.bio}</p>
                            <ul
                                className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                <li className="flex items-center py-3">
                                    <span>Status</span>
                                    <span className="ml-auto">
                                        {
                                            props?.data?.is_active == true ? <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span> : <span className="bg-red-500 py-1 px-2 rounded text-white text-sm">Inactive</span>
                                        }

                                    </span>
                                </li>
                                <li className="flex items-center py-3">
                                    <span>Member since</span>
                                    <span className="ml-auto">{props.data ? dateFormat(props?.data.date_joined,true) : ''}</span>
                                </li>
                                <li>
                                    <Button className="w-full" type="txtPrimary" text="Change Password" onClick={()=>changepassword()} />
                                </li>
                            </ul>
                        </div>
                        <div className="my-4"></div>
                        {/* <div className="bg-white p-3 hover:shadow">
                            <div className="flex items-center space-x-3 font-semibold text-gray-900 text-xl leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5 fill-current" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </span>
                                <span>Similar Profiles</span>
                            </div>
                            <div className="grid grid-cols-3">
                                <div className="text-center my-2">
                                    <img className="h-16 w-16 rounded-full mx-auto"
                                        src="https://cdn.australianageingagenda.com.au/wp-content/uploads/2015/06/28085920/Phil-Beckett-2-e1435107243361.jpg"
                                        alt="" />
                                    <a href="#" className="text-main-color">Kojstantin</a>
                                </div>
                                <div className="text-center my-2">
                                    <img className="h-16 w-16 rounded-full mx-auto"
                                        src="https://avatars2.githubusercontent.com/u/24622175?s=60&amp;v=4"
                                        alt="" />
                                    <a href="#" className="text-main-color">James</a>
                                </div>
                                <div className="text-center my-2">
                                    <img className="h-16 w-16 rounded-full mx-auto"
                                        src="https://images.pexels.com/photos/3844788/pexels-photo-3844788.jpeg"
                                        alt="" />
                                    <a href="#" className="text-main-color">Natie</a>
                                </div>
                                <div className="text-center my-2">
                                    <img className="h-16 w-16 rounded-full mx-auto"
                                        src="https://bucketeer-e05bbc84-baa3-437e-9518-adb32be77984.s3.amazonaws.com/public/images/f04b52da-12f2-449f-b90c-5e4d5e2b1469_361x361.png"
                                        alt="" />
                                    <a href="#" className="text-main-color">Casey</a>
                                </div>
                            </div>
                        </div> */}
                    </div>
                    <div className="w-full md:w-9/12 mx-2 h-64">
                        <div className="bg-white p-3 shadow-sm rounded-sm">
                            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                <span className="text-green-500">
                                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </span>
                                <span className="tracking-wide">About</span>
                            </div>
                            <div className="text-gray-700">
                                <div className="grid md:grid-cols-2 text-sm">
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">First Name</div>
                                        <div className="px-4 py-2">{props?.data?.first_name ? firstLetterCapital(props?.data?.first_name) : (props?.data?.fullname) ? firstLetterCapital(props?.data?.fullname?.split(" ")[0]) : ''}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Last Name</div>
                                        <div className="px-4 py-2">{props?.data?.last_name ? firstLetterCapital(props?.data?.last_name) : props?.data?.fullname ? firstLetterCapital(props?.data?.fullname?.split(" ").pop()) :''}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Gender</div>
                                        <div className="px-4 py-2">{firstLetterCapital(props?.data?.gender)}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Contact No.</div>
                                        <div className="px-4 py-2">{props?.data?.phone_number}</div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Email.</div>
                                        <div className="px-4 py-2">
                                            <a className="text-blue-800" href={`mailto:${props?.data.email}`}>{props?.data?.email}</a>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-2">
                                        <div className="px-4 py-2 font-semibold">Birthday</div>
                                        <div className="px-4 py-2">{dateFormat(props?.data.date_of_birth)}</div>
                                    </div>
                                </div>
                            </div>
                            <button onClick={()=>editProfile()}
                                className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit My Details</button>
                        </div>

                        <div className="my-4"></div>

                        {/* <div className="bg-white p-3 shadow-sm rounded-sm">

                            <div className="grid grid-cols-2">
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Experience</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Owner at Her Company Inc.</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                                        <span className="text-green-500">
                                            <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                stroke="currentColor">
                                                <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                                                <path fill="#fff"
                                                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                                            </svg>
                                        </span>
                                        <span className="tracking-wide">Education</span>
                                    </div>
                                    <ul className="list-inside space-y-2">
                                        <li>
                                            <div className="text-teal-600">Masters Degree in Oxford</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                        <li>
                                            <div className="text-teal-600">Bachelors Degreen in LPU</div>
                                            <div className="text-gray-500 text-xs">March 2020 - Now</div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className='flex w-full justify-center'>

                                <button
                                    className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Edit My Details</button>
                            </div>
                        </div> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OurProfile