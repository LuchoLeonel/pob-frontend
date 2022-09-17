import { Box, Image} from "@chakra-ui/react";
// import logoImage from "../assets/dots-logo.png";

type Props = {
    w?: number;
    h?: number;
    padding?: string;
};

const LogoIcon = ({ w, h, padding }: Props) => (
<Box p={padding}>
    <Image src="/dots-logo.png" alt="Logo" maxWidth={w}/>
</Box>
)

export default LogoIcon