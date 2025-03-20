import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket2s"
})
export class CrouchingSlash extends Skill.Skill
{
    Name: string = "Crouching Slash";
    FrameData: Skill.FrameData = 

        new Skill.FrameDataBuilder()

            .SetStartup(11)
            .SetActive(6)
            .SetRecovery(9  /* it's actually 3,3 with a two-frame interval between */)
            .SetBlockAdvantage(3)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("2P")
                    .SetAnimationId("rbxassetid://71464144610846")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default CrouchingSlash;
