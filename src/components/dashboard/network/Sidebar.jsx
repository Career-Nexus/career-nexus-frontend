import React, { useEffect, useState } from 'react'
import { Premium } from '../home/EventsHome'
import { NetworkService } from '../../../api/NetworkService'

const SideBar = ({ invites = [] }) => {
    const [followings, setFollowings] = useState(0);
    const [connections, setConnections] = useState(0);
    const [pendingInvites, setPendingInvites] = useState([]);

    const category = [
        { id: 1, cat: 'Invite Sent', num: 0 },
        { id: 2, cat: 'Connections', num: 0 },
        { id: 3, cat: 'Followings', num: 1 },
    ]
    const fetchPendingInvites = async () => {
    try {
      const response = await NetworkService.getPendingConnections();
      setPendingInvites(response);
    } catch (error) {
      console.error("Error fetching pending invitations:", error);
    }
  };
    const Followings = async () => {
        try {
            const response = await NetworkService.followerscount();
            if (response) {
                setFollowings(response);
            }
        } catch (error) {
            console.error("Error fetching followings:", error);
        }
    }
    const Connections = async () => {
        try {
            const response = await NetworkService.connectionscount();
            if (response) {
                setConnections(response);
            }
        } catch (error) {
            console.error("Error fetching connections:", error);
        }
    }
    useEffect(() => {
        Followings();
        Connections();
        fetchPendingInvites();
    }, []);
    return (
        <div className=''>
            <div className='border border-gray rounded-lg'>
                <h1 className='p-3 font-semibold'>My Network</h1>
                <div className='flex flex-col gap-4 p-3'>
                    <div className='flex items-center justify-between'>
                        <p>Requests Received</p>
                        <p>{pendingInvites.count}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Connections</p>
                        <p>{connections.connections_count}</p>
                    </div>
                    <div className='flex items-center justify-between'>
                        <p>Followings</p>
                        <p>{followings['followers count']}</p>
                    </div>
                </div>
            </div>
            <div className='mt-5'>
                <Premium />
            </div>
        </div>
    )
}

export default SideBar