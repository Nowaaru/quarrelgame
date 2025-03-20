import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basketfs.2"
})
export class FarSlash2 extends Skill.Skill
{
    Name: string = "Far Slash 2";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(12)
            .SetActive(4)
            .SetRecovery(27)
            .SetBlockAdvantage(14)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("Far Slash 2")
                    .SetAnimationId("rbxassetid://115100746722124")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default FarSlash2;
