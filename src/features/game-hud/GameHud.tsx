import { PauseIcon } from '@/shared/icons';
import { PixelIconButton } from '@/shared/ui';
import { DEFAULT_PLAYER_HP, useAppStore } from '@/store';

import {
  GameHudActionButtons,
  GameHudActions,
  GameHudMetrics,
  GameHudRoot,
} from './GameHud.styles';
import { HudControls, LifeBar, Score, Wave } from './components';

export function GameHud() {
  const pauseGame = useAppStore((state) => state.pauseGame);
  const playerHp = useAppStore((state) => state.playerHp);
  const pressedKeys = useAppStore((state) => state.pressedKeys);
  const pressedMouseButtons = useAppStore((state) => state.pressedMouseButtons);
  const score = useAppStore((state) => state.score);
  const wave = useAppStore((state) => state.wave);

  return (
    <GameHudRoot aria-label="Game HUD">
      <GameHudMetrics>
        <Score value={score} />
        <Wave value={wave} />
      </GameHudMetrics>

      <GameHudActions>
        <GameHudActionButtons>
          <PixelIconButton
            aria-label="Pause game"
            onClick={pauseGame}
            variant="secondary"
          >
            <PauseIcon />
          </PixelIconButton>
        </GameHudActionButtons>

        <LifeBar currentLives={playerHp} totalLives={DEFAULT_PLAYER_HP} />
      </GameHudActions>

      <HudControls
        pressedKeys={pressedKeys}
        pressedMouseButtons={pressedMouseButtons}
      />
    </GameHudRoot>
  );
}
