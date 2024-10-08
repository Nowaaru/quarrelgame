import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";
import { ShowDolphin } from "../util/dolphin";
import TotsugekiFlyHS from "./skill-dependencies/totsugeki-heavy-fly";

export const TotsugekiHS = new Skill.SkillBuilder()
    .SetName("Totsugeki - Heavy (Start)")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(18)
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
                    .SetName("236HS")
                    .SetAnimationId("rbxassetid://138927552266940")
                    .Construct(),
            ),
    )
    .SetLink(TotsugekiFlyHS)
    .Construct();

export default TotsugekiHS;
