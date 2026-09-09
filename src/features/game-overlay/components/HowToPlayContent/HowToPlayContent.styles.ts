import styled from '@emotion/styled';

export const HowToPlayBody = styled.div({
  display: 'grid',
  gap: '22px',
});

export const HowToPlaySection = styled.section(({ theme }) => ({
  display: 'grid',
  gap: '10px',
  fontSize: '14px',
  '& h3': {
    color: theme.palette.primary.main,
    fontSize: '10px',
  },
}));
