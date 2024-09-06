
import { Animation, Skill, Hitbox, Motion, Input } from "@quarrelgame-framework/common";
import TotsugekiFlyHS from "./skill-dependencies/totsugeki-heavy-fly";
import { HideDolphin, ShowDolphin } from "../util/dolphin";

export const TotsugekiSplit = new Skill.SkillBuilder()
    .SetName("Totsugeki - Split")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(4)
            .SetActive(0)
            .SetRecovery(8)
            .SetContact(0)
            .SetBlockAdvantage(0)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(0, (entity) =>
            {
                HideDolphin(entity)
                const { RootPart } = entity.ControllerManager;
                if (!RootPart)

                    return;

                RootPart.AssemblyLinearVelocity = entity.ControllerManager.FacingDirection.mul(-8).add(new Vector3(0, 8, 0))
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("236HS")
                    .SetAnimationId("rbxassetid://138927552266940")
                    .Construct(),
            ),
    )
    .Construct();

export default TotsugekiSplit;
