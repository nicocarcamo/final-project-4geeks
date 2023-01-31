
import React, { useContext, useState, useEffect } from "react";
import { Context } from "../store/appContext";
import { Card, Icon } from 'semantic-ui-react'
import { useNavigate } from 'react-router-dom';


export const Perfil = () => {
	const { store, actions } = useContext(Context);
	const navigate = useNavigate();
	// const [profile, setProfile] = useState({});

	useEffect(() => {
        if (!store.currentUser) navigate('/login');
        actions.getProfile();
    }, [])

	// useEffect(() => {
    //     if (!store.currentUser) navigate('/login');
    //     actions.getProfile();
    // }, [store.currentUser])


	const extra = (
		<a>
			<Icon name='user' />
			16 Followers
		</a>
	)

	return (
		<div className="container d-flex justify-content-center mt-5">
			<Card
				image="https://t4.ftcdn.net/jpg/04/08/24/43/360_F_408244382_Ex6k7k8XYzTbiXLNJgIL8gssebpLLBZQ.jpg"
				header={store.profile?.username}
				meta={store.profile?.firstname}
				description={store.profile?.email}
				extra={extra}
			/>
		</div>
	);
};

