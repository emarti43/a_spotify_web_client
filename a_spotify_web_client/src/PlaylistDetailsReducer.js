export const PlaylistDetailsReducer = (state, action) => {
  switch(action.type) {
    case 'POP':
      let poppedStack = state.playlists.slice(0, state.playlists.length - 1);
      return {...state, playlists: poppedStack };
    case 'PUSH':
      let newStack = state.playlists ? [...state.playlists, action.data] : [action.data]
      return { ...state, playlists: newStack };
    default:
      throw new Error();
  }
}

export default PlaylistDetailsReducer
