/*
 * @Author: fantiga
 * @Date: 2023-07-15 12:48:35
 * @LastEditTime: 2023-07-15 17:48:57
 * @LastEditors: fantiga
 * @FilePath: /kei-tutorial/client/src/pages/Level.tsx
 */

import Head from "@/components/Head";
import { Grid, Link } from "@mui/material";
import { FC } from "react";
// import Accordion from '@mui/material/Accordion';
// import MuiAccordion from '@mui/material/Accordion';
// import MuiAccordionSummary from '@mui/material/AccordionSummary';
// import MuiAccordionDetails from '@mui/material/AccordionDetails';

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
      <div>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>入門レベル</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <Link href="#" onClick={() => navigate('/Game')}>A - 1</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>A - 2</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>A - 3</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>A - 4</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>A - 5</Link>
            </Typography>
          </AccordionDetails>
        </Accordion >
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography>初級レベル</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <Link href="#" onClick={() => navigate('/Game')}>B - 1</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>B - 2</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>B - 3</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>B - 4</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>B - 5</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography>中級レベル</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
            <Link href="#" onClick={() => navigate('/Game')}>C - 1</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>C - 2</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>C - 3</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>C - 4</Link><br />
            <Link href="#" onClick={() => navigate('/Game')}>C - 5</Link>
            </Typography>
          </AccordionDetails>
        </Accordion>
      </div>
    </>
  );
}


export default Level;
