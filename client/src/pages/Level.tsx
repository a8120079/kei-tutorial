/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-21 23:53:44
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Grid, List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { FC } from "react";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from "react-router-dom";

const Level: FC = () => {
  const navigate = useNavigate();

  return (
    <>
      <Head />
      <Grid container justifyContent="center" spacing={1} sx={{ padding: "6px" }}>
        <Grid item>
          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>入門レベル</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="A - 1" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="A - 2" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="A - 3" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="A - 4" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="A - 5" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>入門レベル</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="B - 1" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="B - 2" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="B - 3" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="B - 4" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="B - 5" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>

          <Accordion defaultExpanded={true}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>入門レベル</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List disablePadding>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="C - 1" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="C - 2" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="C - 3" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="C - 4" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                  <ListItemButton>
                    <ListItemText primary="C - 5" onClick={() => navigate('/Game')} />
                  </ListItemButton>
                </ListItem>
              </List>
            </AccordionDetails>
          </Accordion>
        </Grid>
      </Grid>
    </>
  );
};

export default Level;
