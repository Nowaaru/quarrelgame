import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket2k"
})
export class CrouchingKick extends Skill.Skill
{
    Name: string = "Crouching Kick";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(5)
            .SetActive(3)
            .SetRecovery(11)
            .SetBlockAdvantage(2)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("2K")
                    .SetAnimationId("rbxassetid://87234717391883")
                    .Construct(),
            ).Construct();
    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default CrouchingKick;
