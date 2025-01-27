import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./store";
import { selectAccessToken, selectRefreshToken, selectUser, selectUserId } from "./user/userSlice";
import { selectReminders } from "./reminders/remindersSlice";
import { selectCourses } from "./course/courseSlice";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

export const useSelectors = () => {
    const refreshToken = useAppSelector(selectRefreshToken);
    const accessToken = useAppSelector(selectAccessToken);
    const userId = useAppSelector(selectUserId);
    const user = useAppSelector(selectUser);
    const reminders = useAppSelector(selectReminders);
    const courses = useAppSelector(selectCourses);

    return { refreshToken, accessToken, userId, user, reminders, courses }
};
