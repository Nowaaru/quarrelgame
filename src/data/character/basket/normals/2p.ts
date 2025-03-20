import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basket2p"
})
export class CrouchingPunch extends Skill.Skill
{
    Name: string = "Crouching Punch";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(7)
            .SetActive(4)
            .SetRecovery(9)
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
                    .SetAnimationId("rbxassetid://105637288594691")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default CrouchingPunch;
