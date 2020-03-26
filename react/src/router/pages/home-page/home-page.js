import React from "react";
import Note from "../../../components/note";
import NotesList from "../../../components/notes-list";
import './home-page.css';

const HomePage = () => {

    return (
        <div className='home-page'>

            <Note/>

            <NotesList />

        </div>
    );
};

export default HomePage;