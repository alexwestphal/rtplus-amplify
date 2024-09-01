

export interface LogoProps {
    className?: string
}


export default function Logo({className}: LogoProps) {

    return <svg className={className} viewBox="0 0 100 50">
        
        <path d="M 23.5 40 L 25.5 12" stroke="black" strokeWidth="2" fill="transparent"/>
        <path d="M 25.5 40 L 23.5 12" stroke="red" strokeWidth="1.5" fill="transparent"/>
        <path d="M 25 12 L 32 14 C 45 13, 42 28, 32 26 L 25 28" stroke="black" strokeWidth="2" fill="transparent"/>
        <path d="M 25 14 L 32 12 C 42 13, 45 28, 32 28 L 25 26" stroke="red" strokeWidth="1.5" fill="transparent"/>
        <path d="M 33.5 28 L 42 40" stroke="black" strokeWidth="2"/>
        <path d="M 35.5 28 L 40 40" stroke="red" strokeWidth="1.5"/>

        <path d="M 46 12 L 67 14" stroke="black" strokeWidth="2"/>
        <path d="M 55 12 L 57.5 40" stroke="black" strokeWidth="2"/>
        <path d="M 46 14 L 67 12" stroke="red" strokeWidth="1.5"/>
        <path d="M 57 12 L 55 26 L 55 40" stroke="red" strokeWidth="1.5"/>

        <g transform="translate(75 25)">
            <path d="M -10 -1 L 10 1" stroke="black" strokeWidth="2"/>
            <path d="M -1 -10 L 1 10" stroke="black" strokeWidth="2" />
            <path d="M -10 1 L 10 -1" stroke="red" strokeWidth="1.5"/>
            
            
            <path d="M 1 -10 L -1 10" stroke="red" strokeWidth="1.5" />
        </g>
        
    </svg>
}