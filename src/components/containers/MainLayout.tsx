import { Outlet, useLocation } from "react-router-dom";
import { Stack, Typography, Box, Container } from "@mui/material";

import { MainCard, MainSearch } from "src/components/UI";

export const MainLayout = () => {
  const { pathname } = useLocation();

  return (
    <>
      <Container>
        <Box my={5}>
          <Typography
            variant="h4"
            color="white"
            fontWeight="600"
            textAlign="center"
          >
            Test MERN
          </Typography>
        </Box>

        {pathname === "/" && (
          <Box mb={4.5}>
            <MainCard>
              <Typography
                color="white"
                variant="h6"
                textAlign="center"
                // lineHeight={0.5}
                mb={0}
              >
                Busca un cliente
              </Typography>

              <Box display="flex" justifyContent="center">
                <MainSearch />
              </Box>
            </MainCard>
          </Box>
        )}

        <Stack spacing={5}>
          <MainCard>
            <Outlet />
          </MainCard>

          <MainCard>
            <Typography
              color="white"
              fontSize={19}
              fontWeight="600"
              textAlign="center"
            >
              Test MERN - Emanuel Mamani - hecho con ❤️
            </Typography>
          </MainCard>
        </Stack>
      </Container>
    </>
  );
};
