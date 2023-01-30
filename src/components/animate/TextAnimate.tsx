import { m, MotionProps } from 'framer-motion';
// @mui
import { Box, BoxProps } from '@mui/material';
//
import { varFade } from './variants';

// ----------------------------------------------------------------------

type Props = BoxProps & MotionProps;

interface TextAnimateProps extends Props {
  text: string;
}

export default function TextAnimate({ text, variants, sx, ...other }: TextAnimateProps) {
  return (
    <Box
      component={m.h3}
      sx={{
        typography: 'h1',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => {
          if(letter === ' ')
            return <m.span key={index} variants={variants || varFade().inUp} style={{marginRight:'0.3em'}}>
                {letter}
              </m.span>
          return <m.span key={index} variants={variants || varFade().inUp}>
              {letter}
            </m.span>
        })}
    </Box>
  );
}
