import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";

export const FarSlash = new Skill.SkillBuilder()
    .SetName("Close Slash")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(7)
            .SetActive(6)
            .SetRecovery(10)
            .SetContact(3)
            .SetBlockAdvantage(3)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .SetName("C.S")
                    .SetLooped(false)
                    .SetAnimationId("rbxassetid://14488052585")
                    .IsAttack()
                    .Construct(),
            ),
    )
    .Construct();
