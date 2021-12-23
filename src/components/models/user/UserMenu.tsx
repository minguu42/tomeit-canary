import {
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";

import { LogoutIcon } from "components/common/icons";

const UserMenu = (): JSX.Element => (
  <Menu>
    <MenuButton
      as={IconButton}
      aria-label="ユーザアバター"
      icon={<Avatar size="xs" />}
    />
    <MenuList>
      <MenuItem color="red.400" icon={<LogoutIcon />}>
        ログアウト
      </MenuItem>
    </MenuList>
  </Menu>
);

export default UserMenu;
