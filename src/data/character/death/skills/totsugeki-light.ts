import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";
import { ShowDolphin } from "../util/dolphin";
import TotsugekiFlyS from "./skill-dependencies/totsugeki-light-fly";

export const TotsugekiS = new Skill.SkillBuilder()
    .SetName("Totsugeki - Light (Start)")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(7)
            .SetActive(0)
            .SetRecovery(0)
            .SetContact(0)
            .SetBlockAdvantage(0)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 0))
                    .SetSize(new Vector3(0, 0, 0))
                    .Construct(),
            )
            .SetEffectAtFrame(1, (entity, skill) =>
            {
                ShowDolphin(entity)
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("236S")
                    .SetAnimationId("rbxassetid://138927552266940")
                    .Construct(),
            ),
    )
    .SetLink(TotsugekiFlyS)
    .Construct();

export default TotsugekiS;
