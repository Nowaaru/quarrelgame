import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";

export const JumpingKick = new Skill.SkillBuilder()
    .SetName("Jumping Kick")
    .SetGroundedType(Skill.SkillGroundedType.AirOnly)
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
                    .SetName("J.K")
                    .SetLooped(false)
                    .SetAnimationId("rbxassetid://113906307217272")
                    .IsAttack()
                    .Construct(),
            ),
    )
    .Construct();
