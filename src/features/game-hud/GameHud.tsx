import { PauseIcon } from '@/shared/icons';
import { PixelIconButton } from '@/shared/ui';
import { useAppStore } from '@/store';

import { GameHudActions, GameHudMetrics, GameHudRoot } from './GameHud.styles';
import { Score, Wave } from './components';

export function GameHud() {
  const pauseGame = useAppStore((state) => state.pauseGame);

  return (
    <GameHudRoot aria-label="Game HUD">
      <GameHudMetrics>
        <Score value={0} />
        <Wave value={0} />
      </GameHudMetrics>

      <GameHudActions>
        <PixelIconButton
          aria-label="Pause game"
          onClick={pauseGame}
          variant="secondary"
        >
          <PauseIcon />
        </PixelIconButton>
      </GameHudActions>
    </GameHudRoot>
  );
}
