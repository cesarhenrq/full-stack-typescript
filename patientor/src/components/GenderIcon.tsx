import ManIcon from "@mui/icons-material/Man";
import WomanIcon from "@mui/icons-material/Woman";

interface Props {
  icon: string | undefined;
}

const GenderIcon = ({ icon }: Props) => {
  switch (icon) {
    case "male":
      return <ManIcon />;
    case "female":
      return <WomanIcon />;
    default:
      return <ManIcon />;
  }
};

export default GenderIcon;
