import { Animation, QGSkill, Skill, Hitbox, MotionInput, SkillLike } from "@quarrelgame-framework/common";

@QGSkill({
    id: "basketfs"
})
export class FarSlash extends Skill.Skill
{
    Name: string = "Far Slash";
    FrameData: Skill.FrameData = 
        new Skill.FrameDataBuilder()
            .SetStartup(10)
            .SetActive(5)
            .SetRecovery(18)
            .SetBlockAdvantage(9)
            .SetHitbox(
                new Hitbox.HitboxBuilder()
                    .SetOffset(new Vector3(0, 0.5, 2))
                    .SetSize(new Vector3(2, 2, 3.5))
                    .Construct(),
            )
            .SetEffectAtFrame(0, () => print("ok bro thats epic"))
            .SetAnimation(
                new Animation.AnimationBuilder()
                    .IsAttack()
                    .SetName("Far Slash")
                    .SetAnimationId("rbxassetid://139705705123642")
                    .Construct(),
            ).Construct();

    IsReversal = false;
    CanCounter = true;

    GroundedType: Skill.SkillGroundedType = Skill.SkillGroundedType.Ground;
    GaugeRequired = 0;

    GatlingsInto: [MotionInput, SkillLike][] = [];
    LinksInto?: SkillLike | undefined = undefined;
}

export default FarSlash;
