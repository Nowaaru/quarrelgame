
import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket6k"
})
export class ForwardKick extends Skill.Skill
{
    Name: string = "Forward Kick";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(6)
            .SetActive(5)
            .SetRecovery(9)
            .SetContact(4)
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
                    .SetName("5K")
                    .SetAnimationId("rbxassetid://72089845630338")
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

export default ForwardKick;
