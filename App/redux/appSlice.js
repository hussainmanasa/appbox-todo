import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  version: '1.0.0',
  taskList: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setTaskList: (state, action) => {
      state.taskList = action?.payload;
    },
    updateTaskList: (state, action) => {
      state.taskList = state?.taskList?.map(task => {
        if (task?.id == action?.payload?.id) return {...action?.payload};
        else return task;
      });
    },
    deleteTaskList: (state, action) => {
      state.taskList = state?.taskList.filter(
        task => task?.id !== action.payload.id,
      );
    },
  },
});

export const {setTaskList, updateTaskList, deleteTaskList} = appSlice.actions;
export const versionSelector = state => state.app.version;
export const taskListSelector = state => state.app.taskList;
export default appSlice.reducer;
