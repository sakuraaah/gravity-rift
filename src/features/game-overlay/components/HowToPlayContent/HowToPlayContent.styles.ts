import styled from '@emotion/styled';

export const HowToPlayBody = styled.div({
  display: 'grid',
  gap: '16px',
});

export const HowToPlaySection = styled.section(({ theme }) => ({
  display: 'grid',
  gap: '8px',
  '& p': {
    fontFamily: theme.typography.fontFamily.display,
    fontSize: '8px',
    lineHeight: 2.5,
  },
  '& h3': {
    color: theme.palette.primary.main,
    fontSize: '10px',
  },
}));
