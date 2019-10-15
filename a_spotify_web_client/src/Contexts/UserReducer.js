export const UserReducer = (state, action) => {
  switch(action.type) {
    case 'PLAYLIST_POP':
      let poppedStack = state.playlists.slice(0, state.playlists.length - 1);
      return {...state, playlists: poppedStack };
    case 'PLAYLIST_PUSH':
      let newStack = state.playlists ? [...state.playlists, action.data] : [action.data]
      return { ...state, playlists: newStack };
    case 'UPDATE_TRACK':
      return { ...state, currentlyPlaying: action.data }
    default:
      throw new Error();
  }
}

export default UserReducer
