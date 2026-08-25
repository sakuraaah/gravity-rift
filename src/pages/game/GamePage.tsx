import { useRef } from 'react';

import GameCanvas from '@/game/GameCanvas';
import { TypographyVariant } from '@/shared/ui/Typography';
import { useAppStore } from '@/store';

import {
  GamePageDescription,
  GamePageDescriptionBody,
  GamePageDescriptionControls,
  GamePageDescriptionKicker,
  GamePageDescriptionRoadmap,
  GamePageDescriptionRoadmapItem,
  GamePageDescriptionRoadmapList,
  GamePageDescriptionText,
  GamePageHero,
  GamePageRoot,
  GamePageSurface,
} from './GamePage.styles';
import { GamePageOverlayLayer } from './GamePageOverlayLayer';
import {
  DesktopRequiredNotice,
  useIsDesktopSupported,
} from './desktop-support';

export function GamePage() {
  const gameSurfaceRef = useRef<HTMLElement>(null);
  const isDesktopSupported = useIsDesktopSupported();
  const runId = useAppStore((state) => state.runId);

  return (
    <GamePageRoot>
      <GamePageHero>
        <GamePageSurface
          ref={gameSurfaceRef}
          aria-label="Gravity Rift game"
          tabIndex={-1}
        >
          {isDesktopSupported ? (
            <>
              <GameCanvas key={runId} />
              <GamePageOverlayLayer gameSurfaceRef={gameSurfaceRef} />
            </>
          ) : (
            <DesktopRequiredNotice />
          )}
        </GamePageSurface>
      </GamePageHero>

      <GamePageDescription aria-label="About Gravity Rift">
        <GamePageDescriptionKicker
          component="h2"
          variant={TypographyVariant.Body}
        >
          About the game
        </GamePageDescriptionKicker>

        <GamePageDescriptionBody>
          <GamePageDescriptionText
            component="p"
            variant={TypographyVariant.Body}
          >
            Gravity Rift is a pixel arcade shooter where you fly a small ship
            through an asteroid field. Shoot incoming asteroids to earn points
            and reach the next wave. Each wave is a little faster, so there is
            less time to line up a shot or move out of the way.
          </GamePageDescriptionText>

          <GamePageDescriptionText
            component="p"
            variant={TypographyVariant.Body}
          >
            Asteroids come in three sizes. Large asteroids need three hits,
            medium ones need two and small ones break with a single shot.
            Smaller asteroids also move faster. Hitting an asteroid damages the
            ship.
          </GamePageDescriptionText>

          <GamePageDescriptionText
            component="p"
            variant={TypographyVariant.Body}
          >
            Black holes cycle through idle, active and danger phases before
            collapsing. They do not pull anything while idle. Once active, they
            drag the ship, bullets and asteroids toward the center. Their pull
            is strongest during the danger phase. Touching the center destroys
            the ship immediately.
          </GamePageDescriptionText>

          <GamePageDescriptionControls
            component="p"
            variant={TypographyVariant.Body}
          >
            Rotate with A and D or the left and right arrow keys. Thrust with W
            or the up arrow. Fire with Space or the left mouse button. Press
            Escape to pause the game.
          </GamePageDescriptionControls>

          <GamePageDescriptionRoadmap aria-labelledby="planned-improvements-title">
            <GamePageDescriptionKicker
              id="planned-improvements-title"
              component="h3"
              variant={TypographyVariant.Body}
            >
              Planned improvements
            </GamePageDescriptionKicker>

            <GamePageDescriptionText
              component="p"
              variant={TypographyVariant.Body}
            >
              The current version is a playable MVP. The next planned changes
              are:
            </GamePageDescriptionText>

            <GamePageDescriptionRoadmapList>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Add a How to Play screen.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Make render resolution configurable from a settings screen.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Add difficulty options.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Add a physical collision response between asteroids.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Improve layout support for different screen sizes and aspect
                ratios.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Save selected settings between sessions.
              </GamePageDescriptionRoadmapItem>
              <GamePageDescriptionRoadmapItem
                component="li"
                variant={TypographyVariant.Body}
              >
                Add a scoreboard for the best completed runs.
              </GamePageDescriptionRoadmapItem>
            </GamePageDescriptionRoadmapList>
          </GamePageDescriptionRoadmap>
        </GamePageDescriptionBody>
      </GamePageDescription>
    </GamePageRoot>
  );
}
