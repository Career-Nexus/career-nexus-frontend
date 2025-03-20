import React from 'react'
import { Edit, Video, VideoIcon } from '../../../../icons/icon'
import SocialMediaToolbar from '../LiveStream'

const MainProfile = () => {
    return (
        <div>
            <div>
                <div>
                    <div>
                        <img src="/images/bg-profile.png" alt="cover photo" className='w-full h-auto' />
                    </div>
                    <div>
                        <Edit />
                    </div>
                </div>
                <div>
                    <div>
                        <img src="/images/profile.png" alt="profile picture"
                            className='rounded-full w-32 h-auto mt-[-3.7rem] ml-3' />
                        <img src="/images/active-icon.png" alt="Active" className='ml-28 -mt-8' />
                    </div>
                    <div>
                        <Edit />
                    </div>
                </div>
                <div>
                    <h1>
                        John Smith
                    </h1>
                    <p>
                        BSc, MSc(UK), MSc(USA), PSM I (in view) | Full Stack Development | Scrum Master | Product Management | Agile Methodology Implementation | Process Improvement | Business Analysis | Project Management | Database Administration | Data Analysis
                    </p>
                    <p>
                        New York, USA
                    </p>
                </div>
                <div>
                    <p>
                        Video Intro
                    </p>
                    <img src="/images/video.png" alt="video stream" />
                    <VideoIcon />
                    <Video />
                </div>
            </div>
            <div>
                <button>Posts</button>
                <button>Professional Summary</button>
                <button>Portfolio Virtual Gallery</button>
                <button>Project Catalog</button>
                <button>Analytics Dashboard</button>
            </div>
            <SocialMediaToolbar />
        </div>
    )
}
export default MainProfile