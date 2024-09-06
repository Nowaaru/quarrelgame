import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";

export const ForwardPunch = new Skill.SkillBuilder()
    .SetName("Forward Punch")
    .SetGroundedType(Skill.SkillGroundedType.Ground)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(6)
            .SetActive(4)
            .SetRecovery(10)
            .SetContact(1)
            .SetBlockAdvantage(-2)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, -0.25, 1.5))
                    .SetSize(new Vector3(2, 2, 2.75))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("5P")
                    .SetAnimationId("rbxassetid://14321788726")
                    .Construct(),
            ),
    )
    .Construct();
