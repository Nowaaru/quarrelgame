// 81538891758160
import { Animation, Skill, Hitbox } from "@quarrelgame-framework/common";

export const JumpingHeavySlash = new Skill.SkillBuilder()
    .SetName("Jumping Heavy Slash")
    .SetGroundedType(Skill.SkillGroundedType.AirOnly)
    .SetFrameData(
        new Skill.FrameDataBuilder()
            .SetStartup(8)
            .SetActive(7)
            .SetRecovery(11)
            .SetContact(4)
            .SetBlockAdvantage(4)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetEffectAtFrame(9, (entity, skill) => 
            {
                if (entity.attributes.AirOptions > 0)
                {
                    const primaryPart = entity.instance.PrimaryPart;
                    primaryPart.AssemblyLinearVelocity = primaryPart.AssemblyLinearVelocity.mul(new Vector3(1,0,1)).add(new Vector3(0,35,0))

                    entity.attributes.AirOptions -= 1;
                }
            })
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .SetName("J.HS")
                    .SetLooped(false)
                    .SetPriority(Enum.AnimationPriority.Action)
                    .SetAnimationId("rbxassetid://81538891758160")
                    .IsAttack()
                    .Construct(),
            ),
    )
    .Construct();
