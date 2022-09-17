import { Icon } from "@chakra-ui/react";
import { theme } from "../../styles/theme";

const LogoIcon = (props: any) => (
    <Icon viewBox="0 0 800 336" width="800" height="336"
    {...props}
    >
        <defs>
            <linearGradient id="A">
                <stop offset="0" stop-color="#669C42" />
                <stop offset=".5" stop-color="#669C42" />
                <stop offset="1" stop-color="#b3f21a" />
            </linearGradient>
            <style>@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@100');</style>
        </defs>
        <text
            x="384"
            y="276"
            text-anchor="middle"
            font-size="320"
            font-family="Montserrat"
            fill="url(#A)"
        >
            Dots
        </text>
    </Icon>
)

export default LogoIcon