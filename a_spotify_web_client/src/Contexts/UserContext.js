import React from 'react';

const UserContext = React.createContext({
    playlists: [],
    currentlyPlaying: undefined
});

export default UserContext;
