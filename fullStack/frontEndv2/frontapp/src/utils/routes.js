import IndexPage from '../Page/IndexPage'
import LoginPage from '../Page/LoginPage'
import QuizListPage from '../Page/QuizListPage'
import UserSetingPage from '../Page/UserSetingPage'
import RegistrationPage from '../Page/RegistrationPage'

export const ROUTES = {
    HOME: '/',
    LOGIN: '/authorization',
    REGISTRATION: '/registration',
    QUIZ_LIST: '/quizlist',
    QUIZ_CURRENT: '/quiz',
    USER_SETTING: '/setting'
}

// export const PublicRoutes = [
//     {
//         patch: ROUTES.HOME,
//         Component: IndexPage,
//     },
//     {
//         patch: ROUTES.LOGIN,
//         Component: LoginPage,
//     },
//     {
//         patch: ROUTES.REGISTRATION,
//         Component: RegistrationPage,
//     },
// ]

// export const PrivateRoutes = [
//     {
//         patch: ROUTES.QUIZ_LIST,
//         page: QuizListPage,
//     },
//     {
//         patch: ROUTES.USER_SETTING,
//         page: UserSetingPage
//     },
// ]

