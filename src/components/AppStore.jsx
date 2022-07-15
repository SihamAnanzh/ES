import { Box } from "@mui/material";
import { FlexBox } from "./flex-box";
import AppleStore from "./icons/AppleStore";
import PlayStore from "./icons/PlayStore";

const AppStore = () => {
  return (
    <FlexBox>
      {" "}
      <FlexBox flexWrap="wrap" m={1}>
        <a
          href="https://play.google.com/store/apps/details?id=com.dominate.express"
          key="Google Play"
          target="_blank"
        >
          <Box
            m={1}
            gap={1}
            p="10px 16px"
            color="white"
            display="flex"
            bgcolor="#fff"
            borderRadius="5px"
            alignItems="center"
          >
            <PlayStore>PlayStore</PlayStore>

            <Box>
              <Box
                color="#595959"
                fontSize="8px"
                fontWeight="600"
                lineHeight="1"
              >
                Get it on
              </Box>

              <Box color="#595959" fontSize="14px" fontWeight="900">
                Google Play
              </Box>
            </Box>
          </Box>
        </a>
      </FlexBox>
      <FlexBox flexWrap="wrap" m={1}>
        <a
          href="https://apps.apple.com/jo/app/xprestores-%D8%A7%D9%83%D8%B3%D8%A8%D8%B1%D8%B3-%D8%B3%D8%AA%D9%88%D8%B1%D8%B2/id1597251061"
          key="AppleStore"
          target="_blank"
          style={{
            width: "160px",
          }}
        >
          <Box
            m={1}
            gap={1}
            p="10px 16px"
            color="white"
            display="flex"
            bgcolor="#fff"
            borderRadius="5px"
            alignItems="center"
          >
            <AppleStore>AppleStore</AppleStore>

            <Box>
              <Box
                color="#595959"
                fontSize="8px"
                fontWeight="600"
                lineHeight="1"
              >
                Download on the
              </Box>

              <Box color="#595959" fontSize="14px" fontWeight="900">
                App Store
              </Box>
            </Box>
          </Box>
        </a>
      </FlexBox>
    </FlexBox>
  );
};

const appList = [
  {
    icon: PlayStore,
    title: "Google Play",
    subtitle: "Get it on",
    url: "https://play.google.com/store/apps/details?id=com.dominate.express",
  },
  {
    icon: AppleStore,
    title: "App Store",
    subtitle: "Download on the",
    url: "https://apps.apple.com/jo/app/xprestores-%D8%A7%D9%83%D8%B3%D8%A8%D8%B1%D8%B3-%D8%B3%D8%AA%D9%88%D8%B1%D8%B2/id1597251061",
  },
];
export default AppStore;
