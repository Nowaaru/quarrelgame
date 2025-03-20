
import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basketcs"
})
export class CloseSlash extends Skill.Skill
{
    Name: string = "Close Slash";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(7)
            .SetActive(6)
            .SetRecovery(13)
            .SetContact(4)
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
                    .SetName("Close Slash")
                    .SetAnimationId("rbxassetid://135878707231496")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default CloseSlash;
