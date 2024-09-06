import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";
import FrameData from "shared/framedata.json";

export const Heavy = new Skill.SkillBuilder()
    .SetName("Heavy Slash")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(23)
            .SetActive(10)
            .SetRecovery(12)
            .SetContact(FrameData.Attack.Level[4].HitstunStand)
            .SetBlockAdvantage(-4)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0, 3.45))
                    .SetSize(new Vector3(4, 6.75, 6))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("5H")
                    .SetAnimationId("rbxassetid://96643414532857")
                    .Construct(),
            ),
    )
    .Construct();
