// heavy 138927552266940
// slash 116729189239923
// fly 135030929304561
import { Animation, Skill, Hitbox, Motion, Input } from "@quarrelgame-framework/common";
import FrameData from "shared/framedata.json";
import TotsugekiFlyHS from "./skill-dependencies/totsugeki-heavy-fly";
import { HideDolphin, ShowDolphin } from "../util/dolphin";

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
