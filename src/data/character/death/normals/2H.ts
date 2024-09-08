import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "tgr2H"
})
export class LowHeavy extends Skill.Skill
{
    Name: string = "Low Heavy Slash";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(11)
            .SetActive(6)
            .SetRecovery(21)
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
                    .SetName("2HS")
                    .SetAnimationId("rbxassetid://14322453534")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default LowHeavy;
