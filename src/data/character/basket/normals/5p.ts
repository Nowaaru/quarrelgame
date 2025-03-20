import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket5p"
})
export class StandingPunch extends Skill.Skill
{
    Name: string = "Standing Punch";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(8)
            .SetActive(2)
            .SetRecovery(14)
            .SetBlockAdvantage(8)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("5P")
                    .SetAnimationId("rbxassetid://85810499156427")
                    .Construct(),
            ).Construct();
    //c-s 135878707231496
    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default StandingPunch;
