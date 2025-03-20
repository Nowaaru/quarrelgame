import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket5k"
})
export class StandingKick extends Skill.Skill
{
    Name: string = "Standing Kick";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(6)
            .SetActive(5)
            .SetRecovery(9)
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
                    .SetName("5K")
                    .SetAnimationId("rbxassetid://105809870905847")
                    .Construct(),
            ).Construct();
    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default StandingKick;
