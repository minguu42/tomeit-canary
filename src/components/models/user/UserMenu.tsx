import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";

const UserMenu = (): JSX.Element => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="ユーザアバター"
      icon={<Avatar size="xs" />}
    />
    <MenuList>
      <MenuItem color="red.400" icon={<MdLogout />}>
        ログアウト
      </MenuItem>
    </MenuList>
  </Menu>
);

export default UserMenu;
