import { Dispatch } from "react"

const themeDict = {
	primaryL: "text-heading-m text-white bg-purple-600 hover:bg-purple-300 ",
	primaryS: "text-heading-s text-white bg-purple-600 hover:bg-purple-300",
	secondary: "text-heading-l text-purple-600 bg-[#635FC7]/10 bg-[#635FC7]/25", 
	desctructive: "text-heading-l bg-red-600 hover:bg-red-300 text-white"
} as const

type ButtonProps = React.PropsWithChildren<{
	onClick?: () => void,
	theme: keyof typeof themeDict
}>
export const Button: React.FC<ButtonProps> = ({ onClick, children, theme }) => {
	return <button className={`${themeDict[theme]} px-6 py-4 rounded-[9999px]`} onClick={onClick}>
		{children}
	</button>
}
